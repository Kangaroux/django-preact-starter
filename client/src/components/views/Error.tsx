import { h } from "preact";


export interface Props {
    code: number;
}


export const Error = (props: Props) => {
    return <h1>Error {props.code}</h1>;
}
