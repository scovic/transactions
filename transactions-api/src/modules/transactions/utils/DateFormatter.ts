export class DateFormatter {
  public static format(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${this.formatToTwoDigits(month)}-${this.formatToTwoDigits(day)}`;
  }

  private static formatToTwoDigits(value: number) {
    return value < 9 ? `0${value}` : value;
  }
}
