/// <reference types="jquery" />
interface JQuery {
  /**
   * Tooltip
   * @param arg0 show hide
   */
  tooltip(arg0: string): void;
  /**
   * Get current ID(*) or NAME attribute
   */
  getIDName(): String;
  /**
   * Smartform
   * @description saving queries from user input
   * @todo save typed words
   */
  smartForm(): void;

  /**
   * Auto height textarea based on input
   * @example $('textarea').autoHeight();
   */
  autoHeight(): void;

  /**
   * @see https://github.com/imalliar/jquery.progressBarTimer
   * @param arg0
   */
  progressBarTimer(arg0: {
    warningThreshold: number; timeLimit: string | number; baseStyle: any; warningStyle: any; completeStyle: any; smooth: boolean; striped: boolean; animated: boolean; height: number; onFinish: () => void; label: {
      show: boolean,
      type: 'percent' // percent or 'seconds' => 23/60
    }; autoStart: boolean;
  });
}