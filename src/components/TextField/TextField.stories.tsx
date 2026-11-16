import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { TextField } from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    label: "E-post",
    type: "email",
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Ett tillstånd per story: det är hela idén.
export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: "Vi använder den bara för bekräftelser." },
};

export const Required: Story = {
  args: { required: true },
};

export const WithError: Story = {
  args: {
    defaultValue: "andrea@",
    error: "Ange en giltig e-postadress, till exempel namn@exempel.se.",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "andrea@exempel.se" },
};

/** Interaktiv story: felet visas först när fältet lämnas med ogiltigt värde. */
export const ValidatesOnBlur: Story = {
  args: { required: true, hint: "Vi använder den bara för bekräftelser." },
  render: (args) => {
    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);
    const invalid = touched && !/^\S+@\S+\.\S+$/.test(value);

    return (
      <TextField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        error={invalid ? "Ange en giltig e-postadress." : undefined}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/E-post/);

    await userEvent.type(input, "andrea@");
    await userEvent.tab(); // lämna fältet

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "Ange en giltig e-postadress.",
    );

    await userEvent.type(input, "exempel.se");
    await expect(input).toHaveValue("andrea@exempel.se");
  },
};
