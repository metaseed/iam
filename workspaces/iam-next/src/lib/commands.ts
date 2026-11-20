// Replaces core/services/command.service + `angular-hotkey`: maps key combos from `config.json` (`hotkeys`) to command
// names and lets features subscribe by name.
//
//   const commands = createCommands(config.hotkeys);   // { "ctrl+b": ["Bold"], "ctrl+m f": ["Focus"] }
//   const off = commands.on('Bold', (cmd) => { toggleBold(); });   // return false to preventDefault
//
// A combo is `modifier+key` (ctrl, alt, shift, meta); several steps separated by a space form a sequence ("ctrl+m f").
// Bare keys (no ctrl/alt/meta) are ignored while typing in an input, textarea or contenteditable.

export interface Command {
	name: string;
	/** The combo as configured, normalized (e.g. `ctrl+m f`). */
	combo: string;
	event: KeyboardEvent;
}

export type CommandHandler = (command: Command) => boolean | void;

const KEY_ALIASES: Record<string, string> = {
	arrowright: 'right',
	arrowleft: 'left',
	arrowup: 'up',
	arrowdown: 'down',
	escape: 'esc',
	' ': 'space',
	spacebar: 'space',
	del: 'delete',
	return: 'enter',
};
const MODIFIER_ALIASES: Record<string, string> = { control: 'ctrl', option: 'alt', command: 'meta', cmd: 'meta' };
const MODIFIER_ORDER = ['ctrl', 'alt', 'shift', 'meta'];

/** One step, e.g. `Ctrl+Right` -> `ctrl+right`. */
export function normalizeStep(step: string): string {
	const parts = step.toLowerCase().split('+').map((p) => p.trim()).filter(Boolean);
	const mods = new Set<string>();
	let key = '';
	for (const p of parts) {
		const m = MODIFIER_ALIASES[p] ?? p;
		if (MODIFIER_ORDER.includes(m)) mods.add(m);
		else key = KEY_ALIASES[p] ?? p;
	}
	return [...MODIFIER_ORDER.filter((m) => mods.has(m)), key].filter(Boolean).join('+');
}

export function normalizeCombo(combo: string): string {
	return combo.trim().split(/\s+/).map(normalizeStep).join(' ');
}

/** The step a key event represents, in the same form as `normalizeStep`. */
export function stepOf(e: KeyboardEvent): string {
	const key = KEY_ALIASES[e.key.toLowerCase()] ?? e.key.toLowerCase();
	if (['control', 'alt', 'shift', 'meta'].includes(key)) return ''; // a modifier on its own
	const mods = [e.ctrlKey && 'ctrl', e.altKey && 'alt', e.shiftKey && 'shift', e.metaKey && 'meta'].filter(Boolean);
	return [...mods, key].join('+');
}

function isEditable(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false;
	return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

const SEQUENCE_TIMEOUT_MS = 1000;

export interface Commands {
	/** Subscribe to a command by name; returns the unsubscribe function. */
	on(name: string, handler: CommandHandler): () => void;
	dispose(): void;
}

export function createCommands(
	hotkeys: Readonly<Record<string, readonly string[]>>,
	target: Pick<EventTarget, 'addEventListener' | 'removeEventListener'> = document,
): Commands {
	const bindings = Object.entries(hotkeys).map(([combo, names]) => {
		const normalized = normalizeCombo(combo);
		return { combo: normalized, steps: normalized.split(' '), names };
	});
	const maxSteps = Math.max(1, ...bindings.map((b) => b.steps.length));
	const handlers = new Map<string, Set<CommandHandler>>();
	let buffer: string[] = [];
	let timer: ReturnType<typeof setTimeout> | undefined;

	const onKeyDown = (event: Event): void => {
		const e = event as KeyboardEvent;
		const step = stepOf(e);
		if (!step) return;
		const hasModifier = e.ctrlKey || e.altKey || e.metaKey;
		if (!hasModifier && isEditable(e.target)) return;

		buffer = [...buffer, step].slice(-maxSteps);
		clearTimeout(timer);
		timer = setTimeout(() => (buffer = []), SEQUENCE_TIMEOUT_MS);

		for (const b of bindings) {
			if (b.steps.length > buffer.length) continue;
			if (!b.steps.every((s, i) => s === buffer[buffer.length - b.steps.length + i])) continue;
			buffer = [];
			let prevent = false;
			for (const name of b.names) {
				for (const handler of handlers.get(name) ?? []) {
					if (handler({ name, combo: b.combo, event: e }) === false) prevent = true;
				}
			}
			if (prevent) e.preventDefault();
			return;
		}
	};
	target.addEventListener('keydown', onKeyDown);

	return {
		on(name, handler) {
			let set = handlers.get(name);
			if (!set) handlers.set(name, (set = new Set()));
			set.add(handler);
			return () => set.delete(handler);
		},
		dispose() {
			target.removeEventListener('keydown', onKeyDown);
			clearTimeout(timer);
			handlers.clear();
		},
	};
}
