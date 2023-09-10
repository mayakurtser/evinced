import React from "react";
import { render, screen } from "@testing-library/react";
import Typography from "../typography";
import classes from "../typography.module.scss";

describe("Typography", () => {
  it("renders Typography", () => {
    render(<Typography classes={classes} value="Matrix" />);
    expect(screen.getByText("Matrix")).toBeInTheDocument();
  });
});
