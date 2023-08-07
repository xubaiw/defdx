import * as _A from "npm:ts-arithmetic";

export type Tensor<Size extends number[]> = {
  size: Size;
  data: number[];
};

export type Module<Input, Output> = {
  forward: (input: Input) => Output;
};

export type Linear<I extends number, O extends number> = {
  w: Tensor<[O, I]>;
  b: Tensor<[O]>;
} & Module<Tensor<[I]>, Tensor<[O]>>;

export const linear = <I extends number, O extends number>(
  i: I,
  o: O,
): Linear<I, O> => {
  const w: Tensor<[O, I]> = {
    size: [o, i],
    data: Array.from({ length: i * o }, () => Math.random()),
  };
  const b: Tensor<[O]> = {
    size: [o],
    data: Array.from({ length: o }, () => Math.random()),
  };
  const forward = (input: Tensor<[I]>): Tensor<[O]> => {
    const data = new Array(o).fill(0);
    for (let m = 0; m < o; m++) {
      for (let n = 0; n < i; n++) data[m] += w.data[m * i + n] * input.data[n];
      data[m] += b.data[m];
    }
    return { size: [o], data };
  };
  return { w, b, forward };
};

if (import.meta.main) {
  const input: Tensor<[3]> = { size: [3], data: [1, 2, 3] };
  const module = linear(3, 2);
  const output = module.forward(input);
  console.log({ output, module });
}
