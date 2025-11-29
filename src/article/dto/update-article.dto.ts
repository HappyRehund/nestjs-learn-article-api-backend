import { PartialType } from "@nestjs/mapped-types";
import { RequestCreateArticleDTO } from "./create-article.dto";

export class RequestUpdateArticleDTO extends PartialType(RequestCreateArticleDTO){}