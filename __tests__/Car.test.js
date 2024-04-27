import { Car } from "../src/Car";

describe("Car", () => {
  it("should have a name", () => {
    const name = "pobi";

    const car = new Car(name);

    expect(car.getName()).toBe(name);
  });

  it("increase position by 1 if the given value is greater than or equal to 4", () => {
    const name = "pobi";
    const value = 5;
    const car = new Car(name);

    expect(car.getPosition()).toBe(0);

    car.play(value);

    expect(car.getPosition()).toBe(1);
  });

  it("should remain in the same position when the given value is less than 4", () => {
    const name = "pobi";
    const value = 1;
    const car = new Car(name);

    expect(car.getPosition()).toBe(0);

    car.play(value);

    expect(car.getPosition()).toBe(0);
  });
});
