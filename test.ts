type CTXT = {
    a: string;
    b: string;
    c: number;
}
type CTXI = {
    val: CTXT;
    setVal: (value: CTXT) => void
}
const ctx: CTXI = {
    val: {} as CTXT,
    setVal: (value: CTXT) => ctx.val.a = value.a,
}
ctx.setVal({ a: 'dsa', b: 'sddsd', c: 123 })
console.log(ctx);