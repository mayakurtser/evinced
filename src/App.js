import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Report } from "containers/Report";
import classes from './App.module.scss';
import { Home } from "containers/Home";
import { MainLayout } from "layouts/MainLayout";
import { NotFound } from "containers/NotFound";

function App() {
    return (
        <Router>
            <MainLayout className={classes.app}>
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/report/:reportName" exact element={<Report/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </MainLayout>

        </Router>
    );
}

export default App;
