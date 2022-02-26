import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to lista all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Ca1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-12345",
      fine_amount: 60,
      brand: "Brand",
      category_id: "9ccc34b2-697f-495a-8798-59774be31483"
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Ca1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-12345",
      fine_amount: 60,
      brand: "Brand21",
      category_id: "9ccc34b2-697f-495a-8798-59774be31483"
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand21",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Ca1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-12345",
      fine_amount: 60,
      brand: "Brand1",
      category_id: "9ccc34b2-697f-495a-8798-59774be314832"
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "9ccc34b2-697f-495a-8798-59774be314832"
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Ca31",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-12345",
      fine_amount: 60,
      brand: "Brand1",
      category_id: "9ccc34b2-697f-495a-8798-59774be31483"
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Name Ca31",
    });
    expect(cars).toEqual([car]);
  });
})