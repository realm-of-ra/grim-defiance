import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Hotell: BuildingInterface = class Hotell {
  public static requirement(): Resource {
    return new Resource(1, 3, 3, 1);
  }

  public static score(): number {
    return 4;
  }

  public static gold(): number {
    return 16;
  }
};