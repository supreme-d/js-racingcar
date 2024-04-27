import { Car } from "../src/Car";

describe("Car", () => {
  it("should have a name", () => {
    const name = "pobi";

    const car = new Car(name);

    expect(car.getName()).toBe(name);
  });
});
