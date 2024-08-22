/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import {
  IconColumns,
  IconInfoSquareRounded,
  IconMusic,
  IconMusicQuestion,
  IconUsers,
  IconVinyl,
} from "@tabler/icons-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Divider from "./components/divider";
import Tooltip from "./components/tooltip";
import { default as mq } from "./utils/mediaQueries";

const navItems = [
  { name: "Songs", path: "/songs", icon: <IconMusic stroke={2} /> },
  { name: "Artists", path: "/artists", icon: <IconUsers stroke={2} /> },
  { name: "Albums", path: "/albums", icon: <IconColumns stroke={2} /> },
  { name: "Genres", path: "/genres", icon: <IconMusicQuestion stroke={2} /> },
];

const StyledHome = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 2rem;
  padding: 2rem;
  height: calc(100vh - 8rem);

  ${mq[2]} {
    grid-template-columns: 1fr;
    grid-template-rows: 4rem 1fr;
    padding: 1rem;
    gap: 1rem;
  }
`;

const StyledNavBar = styled.nav`
  border: 1px solid var(--bg-300);
  display: flex;
  align-items: center;
  border-radius: 8px;
  flex-direction: column;
  height: 100%;
  padding: 2rem 0;
  gap: 2rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  ${mq[2]} {
    flex-direction: row;
    padding: 0 1rem;
    gap: 1rem;
  }
`;

function App() {
  const pathname = useLocation();

  return (
    <StyledHome>
      <StyledNavBar>
        <Link
          to="/songs"
          css={{
            color: "var(--primary-300)",
            [mq[0]]: {
              display: "none",
            },
          }}
        >
          <IconVinyl size={32} stroke={2} />
        </Link>
        <div
          css={{
            display: "block",
            [mq[2]]: {
              display: "none",
            },
          }}
        >
          <Divider direction="horizontal" />
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem 0",
            flexGrow: 1,
            [mq[2]]: {
              flexDirection: "row",
              gap: "0 2rem",
              flexGrow: 0,
            },
          }}
        >
          {navItems.map((item, index) => (
            <div key={index}>
              <Tooltip text={item.name}>
                <Link
                  css={{
                    color:
                      pathname.pathname === item.path
                        ? "var(--primary-200)"
                        : "var(--primary-300)",
                  }}
                  to={item.path}
                >
                  {item.icon}
                </Link>
              </Tooltip>
            </div>
          ))}
        </div>
        <Tooltip text="Info">
          <IconInfoSquareRounded
            css={{ color: "var(--primary-300)" }}
            size={32}
            stroke={2}
          />
        </Tooltip>
      </StyledNavBar>

      <Outlet />
    </StyledHome>
  );
}

export default App;
