import { base64Decode } from "../utils";

/**
 * deprecated: see dev-note:5
 */
export class CopierService {
  private fakeElem: HTMLTextAreaElement | null;

  /**
   * Creates a fake textarea element, sets its value from `text` property,
   * and makes a selection on it.
   */
  private createFake(text: string) {
    const isRTL = document.documentElement.getAttribute("dir") === "rtl";
    this.fakeElem = document.createElement("textarea");
    // Prevent zooming on iOS
    this.fakeElem.style.fontSize = "12pt";
    // Reset box model`````
    this.fakeElem.style.border = "0";
    this.fakeElem.style.padding = "0";
    this.fakeElem.style.margin = "0";

    // Move element out of screen horizontally
    this.fakeElem.style.position = "absolute";
    this.fakeElem.style[isRTL ? "right" : "left"] = "-9999px";

    // Move element to the same position vertically
    const yPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.fakeElem.style.top = yPosition + "px";

    this.fakeElem.setAttribute("readonly", "");
    this.fakeElem.value = text;

    document.body.appendChild(this.fakeElem);

    this.fakeElem.select();
    this.fakeElem.setSelectionRange(0, this.fakeElem.value.length);
  }

  private removeFake() {
    if (this.fakeElem) {
      document.body.removeChild(this.fakeElem);
      this.fakeElem = null;
    }
  }

  copyText(text: string, base64: boolean) {
    try {
      this.createFake(base64 ? base64Decode(text) : text);
      return document.execCommand("copy");
    } catch (err) {
      return false;
    } finally {
      this.removeFake();
    }
  }
}
