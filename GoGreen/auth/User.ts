// A simple data model class that can be used across your backend
export class User {
  static current: User | null = null;

  pts: number;
  coupon: string[];
  name: string;
  email: string;
  pw: string;
  username: string;
  
  constructor({ pts = 0, coupon = [], name = "", email = "", pw = "", username = "" } = {}) {
    this.pts = pts;          // number of points
    this.coupon = coupon;    // array of coupon IDs or values
    this.name = name;        // full name
    this.email = email;      // user email
    this.pw = pw;            // password (store hashed in real use!)
    this.username = username;// public username / handle
  }

  addPoints(amount: number) {
    this.pts += amount;
  }

  addCoupon(code: string) {
    this.coupon.push(code);
  }

  toJSON() {
    // Return a plain object (useful when saving to DB)
    return {
      pts: this.pts,
      coupon: this.coupon,
      name: this.name,
      email: this.email,
      username: this.username,
      pw: this.pw
      // purposely omit pw for safety
    };
  }
}
