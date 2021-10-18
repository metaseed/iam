
export enum SateStatus {
  Start = 'Start',
  Succession = 'Succession',
  Fail = 'Fail',
  Complete = 'Complete',
  Timeout = 'Timeout'
}

export class ActionStatus {
  constructor(
    public status: SateStatus,
    // public action: CorrelationAction,
    public message?: string,
    public context?: any
  ) {}
  isNotStartStatus() {
    return this.status !== SateStatus.Start;
  }
}
