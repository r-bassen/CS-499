export interface Reservation {
  _id?: string;  // internal primary key in MongoDB
  code?: string;
  name?: string;
  userEmail?: string;
  userName?: string;
  length?: string;
  start?: Date;
  resort?: string;
  numGuests?: number;
  totalCost?: string;

}
