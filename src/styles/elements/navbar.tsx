import styled from "styled-components/macro"
import tw from 'twin.macro';

const NavbarStyled = styled.nav.attrs({
    className: "w-full",
})`

 & {
    ul {
        ${tw`text-center mb-3 pt-1 w-full`}
    }

    li {
        ${tw`inline-block m-0 py-1 px-0 w-full`}
    }

    a {
        ${tw`capitalize text-base text-gray-500`}
    }

    @media only screen and (min-width: 768px) {

        ul {
            ${tw`flex w-auto`}
        }

     }
}
`;

export default NavbarStyled;
