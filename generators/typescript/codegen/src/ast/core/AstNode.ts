import { AbstractAstNode } from "@fern-api/generator-commons";
import { Writer } from "./Writer";
import * as prettier from "prettier";

export abstract class AstNode extends AbstractAstNode {
    /**
     * Writes the node to a string.
     */
    public toString(): string {
        const writer = new Writer();
        this.write(writer);
        return writer.toString();
    }

    public toStringFormatted(): string {
        return prettier.format(this.toString(), { parser: "typescript", tabWidth: 4, printWidth: 120 });
    }
}
