import styled from "styled-components/macro"
import tw from 'twin.macro';

const ENavbar = styled.nav.attrs({
    className: "w-full",
})`

 & {
    ul {
        ${tw`inline-block m-0 py-1 px-0 w-full`}
    }
}
`;

export default ENavbar;
