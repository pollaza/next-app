import React from "react";
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import styled from "styled-components";
import {BaseContainer} from "./BaseComponents";

const AppLayout: React.FC = ({children}) => (
  <>
    <AppBar position="static" color="transparent">
      <BaseContainer>
        <StyledToolbar>
          <Link href="/" passHref>
            <img src="/logo-horizontal.svg"/>
          </Link>
          <div>
            <Link href="/results" passHref>
              <Button color="inherit">Resultados</Button>
            </Link>
            <Link href="/bets" passHref>
              <Button color="inherit">Apuestas</Button>
            </Link>
            <Link href="/profile" passHref>
              <Button color="inherit">Perfil</Button>
            </Link>
          </div>
        </StyledToolbar>
      </BaseContainer>
    </AppBar>
    <main>
      <StyledBaseContainer>
        {children}
      </StyledBaseContainer>
    </main>
  </>
);

const StyledToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  img {
    height: 40px;
    cursor: pointer;
  }
  & > div {
    a {
      &:not(:last-of-type) {
        margin-right: 1rem;
      }
    }
  }
`;

const StyledBaseContainer = styled(BaseContainer)`
  margin-top: 4rem;
`;


export default AppLayout;
