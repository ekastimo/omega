import {cleanComboValue, removeEmptyFields} from "./dataHelpers";
import {hasValue} from "../components/inputs/inputHelpers";
import {Option} from "../components/inputs/option";


describe("removeEmptyFields", () => {
    it('removeEmptyFields can clean up data', () => {
        const data = {
            from: null,
            to: null,
            categories: [],
            statuses: [],
            subStatuses: [],
            userId: "",
            applicantId: undefined,
            assignee: undefined
        }
        const result = removeEmptyFields(data)
        expect(hasValue(result)).toEqual(false);
    });

    it('removeEmptyFields can keep filled values', () => {
        const data = {
            from: null,
            to: null,
            categories: [],
            statuses: [],
            subStatuses: [],
            userId: undefined,
            applicantId: undefined,
            assignee: "1000tt",
        }
        const result = removeEmptyFields(data)
        expect(hasValue(result)).toEqual(true);
        expect(hasValue(result.assignee)).toEqual(true);
        expect(Object.keys(result).length).toEqual(1);
    });

})

describe("cleanComboValue", () => {
    it('cleanComboValue can clean up Option', () => {
        const data: Option = {id: "12", name: "Fooo"}
        const result = cleanComboValue(data)
        expect(result).toEqual('12');
    });

    it('cleanComboValue can clean up Option[]', () => {
        const data: Option[] = [
            {id: "12", name: "Fooo"},
            {id: "13", name: "Bar"}
        ]
        const result = cleanComboValue(data)
        expect(result[0]).toEqual('12');
        expect(result[1]).toEqual('13');
    });

    it('cleanComboValue can clean up string', () => {
        const data: string = 'foo'
        const result = cleanComboValue(data)
        expect(result).toEqual('foo');
    });

    it('cleanComboValue can clean up string[]', () => {
        const data: string[] = ['foo','bar']
        const result = cleanComboValue(data)
        expect(result[0]).toEqual('foo');
        expect(result[1]).toEqual('bar');
    });
})



