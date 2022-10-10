import React from "react";
import { render } from "@testing-library/react";
import Home from "../../pages/Home";

describe("Home tests", () => {
    test("renders without crashing", () => {
        render(<Home />);
    });
});
