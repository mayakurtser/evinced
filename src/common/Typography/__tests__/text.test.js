import React from "react";
import { render, screen } from "@testing-library/react";
import Text from "../text";
import { TYPOGRAPHY_SIZES, TYPOGRAPHY_WEIGHTS } from "../constants";

describe("Text", () => {
  it("renders Text ", () => {
    render(<Text value="Happy" />);
    expect(screen.getByText("Happy")).toBeInTheDocument();
  });

  it("renders Text XL ", () => {
    render(
      <Text
        size={TYPOGRAPHY_SIZES.XL}
        weight={TYPOGRAPHY_WEIGHTS.BOLD}
        value="XL"
      />
    );
    expect(screen.getByText("XL")).toHaveClass("xl");
    expect(screen.getByText("XL")).toHaveClass("bold");
  });
  it("renders Text LG ", () => {
    render(
      <Text
        size={TYPOGRAPHY_SIZES.LG}
        weight={TYPOGRAPHY_WEIGHTS.MEDIUM}
        value="LG"
      />
    );
    expect(screen.getByText("LG")).toHaveClass("lg");
    expect(screen.getByText("LG")).toHaveClass("medium");
  });

  it("renders Text MD ", () => {
    render(
      <Text
        size={TYPOGRAPHY_SIZES.MD}
        weight={TYPOGRAPHY_WEIGHTS.SEMI_BOLD}
        value="MD"
      />
    );
    expect(screen.getByText("MD")).toHaveClass("md");
    expect(screen.getByText("MD")).toHaveClass("semiBold");
  });

  it("renders Text SM ", () => {
    render(
      <Text
        size={TYPOGRAPHY_SIZES.SM}
        weight={TYPOGRAPHY_WEIGHTS.REGULAR}
        value="SM"
      />
    );
    expect(screen.getByText("SM")).toHaveClass("sm");
  });

  it("renders Text XS ", () => {
    render(
      <Text
        size={TYPOGRAPHY_SIZES.XS}
        weight={TYPOGRAPHY_WEIGHTS.REGULAR}
        value="XS"
      />
    );
    expect(screen.getByText("XS")).toHaveClass("xs");
  });
});
