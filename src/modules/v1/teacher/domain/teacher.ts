import { err, ok, Result } from "neverthrow";
import { validate } from "uuid";

export type TeacherCreateResult = Result<Teacher, Error>;

export class Teacher {
  private readonly id: string;
  private name: string;
  private link: string;
  private summary: string;

  private constructor(id: string, name: string, link: string, summary: string) {
    this.id = id;
    this.name = name;
    this.link = link;
    this.summary = summary;
  }

  static create(
    id: string,
    name: string,
    link: string,
    summary: string
  ): TeacherCreateResult {
    if (!validate(id)) return err(new Error("Invalid id"));
    if (
      !link.match(
        /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      )
    )
      return err(new Error("Invalid link"));
    if (summary.length < 10) return err(new Error("Invalid summary"));
    if (name.length < 10) return err(new Error("Invalid name"));

    return ok(new Teacher(id, name, link, summary));
  }

  get properties() {
    return {
      id: this.id,
      name: this.name,
      link: this.link,
      summary: this.summary,
    };
  }
}
