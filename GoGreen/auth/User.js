// A simple data model class that can be used across your backend
export class User {
  constructor({ pts = 0, coupon = [], name = "", email = "", pw = "", username = "" } = {}) {
    this.pts = pts;          // number of points
    this.coupon = coupon;    // array of coupon IDs or values
    this.name = name;        // full name
    this.email = email;      // user email
    this.pw = pw;            // password (store hashed in real use!)
    this.username = username;// public username / handle
  }

  // Example helper methods
  addPoints(amount) {
    this.pts += amount;
  }

  addCoupon(code) {
    this.coupon.push(code);
  }

  toJSON() {
    // Return a plain object (useful when saving to DB)
    return {
      pts: this.pts,
      coupon: this.coupon,
      name: this.name,
      email: this.email,
      username: this.username
      // purposely omit pw for safety
    };
  }
}
