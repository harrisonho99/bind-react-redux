
import { cloneDeep } from "lodash"
export const shallow = (obj) => {
    return Object.assign({}, obj)
}
export const deep = (obj) => {
    return cloneDeep(obj)
}