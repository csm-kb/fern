import { TypeInstantiation } from "../TypeInstantiation";
import { Writer } from "../core/Writer";
import { python } from "..";

describe("TypeInstantiation", () => {
    let writer: Writer;

    beforeEach(() => {
        writer = new Writer();
    });

    it("int", async () => {
        TypeInstantiation.int(42).write(writer);
        expect(await writer.toStringFormatted()).toMatchSnapshot();
    });

    it("float", async () => {
        TypeInstantiation.float(3.14).write(writer);
        expect(await writer.toStringFormatted()).toMatchSnapshot();
    });

    describe("bool", () => {
        it("true", async () => {
            TypeInstantiation.bool(true).write(writer);
            expect(await writer.toStringFormatted()).toMatchSnapshot();
        });

        it("false", async () => {
            TypeInstantiation.bool(false).write(writer);
            expect(await writer.toStringFormatted()).toMatchSnapshot();
        });
    });

    it("str", async () => {
        TypeInstantiation.str("hello").write(writer);
        expect(await writer.toStringFormatted()).toMatchSnapshot();
    });

    it("bytes", async () => {
        TypeInstantiation.bytes("world").write(writer);
        expect(await writer.toStringFormatted()).toMatchSnapshot();
    });

    it("list", async () => {
        TypeInstantiation.list([
            TypeInstantiation.int(1),
            TypeInstantiation.str("two"),
            TypeInstantiation.bool(true)
        ]).write(writer);
        expect(await writer.toStringFormatted()).toMatchSnapshot();
    });

    it("set", async () => {
        TypeInstantiation.set([
            TypeInstantiation.int(1),
            TypeInstantiation.str("two"),
            TypeInstantiation.bool(true)
        ]).write(writer);
        expect(await writer.toStringFormatted()).toMatchSnapshot();
    });

    it("tuple", async () => {
        TypeInstantiation.tuple([
            TypeInstantiation.int(1),
            TypeInstantiation.str("two"),
            TypeInstantiation.bool(true)
        ]).write(writer);
        expect(await writer.toStringFormatted()).toMatchSnapshot();
    });

    describe("dict", () => {
        it("should correctly write a dict with primitives", async () => {
            TypeInstantiation.dict([
                { key: TypeInstantiation.str("one"), value: TypeInstantiation.int(1) },
                { key: TypeInstantiation.str("two"), value: TypeInstantiation.bool(true) }
            ]).write(writer);
            expect(await writer.toStringFormatted()).toMatchSnapshot();
        });

        it("should correctly write a dict with references", async () => {
            const dict = TypeInstantiation.dict([
                { key: TypeInstantiation.str("one"), value: python.reference({ name: "MyClass" }) },
                { key: TypeInstantiation.str("two"), value: python.TypeInstantiation.uuid("abc") }
            ]);
            dict.write(writer);
            expect(await writer.toStringFormatted()).toMatchSnapshot();
            expect(dict.getReferences().length).toBe(2);
        });
    });

    it("none", async () => {
        TypeInstantiation.none().write(writer);
        expect(await writer.toStringFormatted()).toMatchSnapshot();
    });

    it("uuid", async () => {
        TypeInstantiation.uuid("123e4567-e89b-12d3-a456-426614174000").write(writer);
        expect(await writer.toStringFormatted()).toMatchSnapshot();
    });
});
