import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AutheticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let autheticateUserUseCase: AutheticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    autheticateUserUseCase = new AutheticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "Luiz",
      driver_license: "12324564",
      email: "luiz.teste@teste.com",
      password: "d34tfdre"
    }

    await createUserUseCase.execute(user);

    const result = await autheticateUserUseCase.execute({ email: user.email, password: user.password });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate an wrong user email", async () => {
    expect(async () => {
      await autheticateUserUseCase.execute({ email: "wrong@email.com", password: "password" });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate an wrong user password", async () => {
    expect(async () => {

      const user: ICreateUserDTO = {
        name: "Luiz",
        driver_license: "12324564",
        email: "luiz.teste@teste.com",
        password: "d34tfdre"
      }

      await createUserUseCase.execute(user);

      await autheticateUserUseCase.execute({ email: user.email, password: "wrongpassword" });
    }).rejects.toBeInstanceOf(AppError);
  });
});