import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Layout from "./screens/laybout/Layout";
import Home from "./screens/home/Home";
import { useGetHeroMoviesQuery, useGetPopluarMoviesQuery } from "./redux/endPoints/movie/movie";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const { data: heroData, isLoading: heroLoading } = useGetHeroMoviesQuery(
    undefined,
    {
      refetchOnReconnect: true,
      refetchOnFocus: true,
      pollingInterval: 60000,
    }
  );
  const { data: popularData, isLoading: popularLoading } =
    useGetPopluarMoviesQuery(undefined, {
      refetchOnReconnect: true,
      refetchOnFocus: true,
      pollingInterval: 60000,
    });
  return (
    <div className="app">
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to={"/movies"} replace />} />
              <Route path="/movies" element={<Home />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;
