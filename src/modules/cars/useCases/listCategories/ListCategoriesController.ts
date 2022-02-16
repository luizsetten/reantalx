import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { container } from "tsyringe";
class ListCategoriesController {
  handle(request: Request, response: Response): Response {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const all = listCategoriesUseCase.execute();
    console.log("Todas as categorias", all)

    return response.json(all);
  }
}

export { ListCategoriesController }