import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;
describe("Create rental", () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsProvider);
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "1212",
      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  })

  it("Should not be able to create a new rental if there's a open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12122",
        expected_return_date: dayAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12121",
        expected_return_date: dayAdd24Hours
      });

    }).rejects.toBeInstanceOf(AppError);

  });

  it("Should not be able to create a new rental if there's a open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "1212",
        expected_return_date: dayAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: "123457",
        car_id: "1212",
        expected_return_date: dayAdd24Hours
      });

    }).rejects.toBeInstanceOf(AppError);

  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123457",
        car_id: "1212",
        expected_return_date: dayjs().toDate()
      });

    }).rejects.toBeInstanceOf(AppError);

  });
})