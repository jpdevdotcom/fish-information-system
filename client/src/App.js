import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Header from "./components/header";
import FishClassification from "./pages/fish-classification";
import FishGenera from "./pages/fish-genera";
import ScientificClassification from "./pages/sci-classification";
import ViewFish from "./pages/view-fish";

function App() {
    return (
        <div className="App">
            <Header />

            <BrowserRouter>
                <div className="flex flex-col items-center justify-center">
                    <Routes>
                        <Route
                            path="/classify-fish"
                            element={<FishClassification />}
                        />
                        <Route path="/fish-genera" element={<FishGenera />} />
                        <Route
                            path="/scientific-classification"
                            element={<ScientificClassification />}
                        />
                        <Route path="/view-fish" element={<ViewFish />} />
                    </Routes>
                </div>

                <div>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
