import { Controller, Control } from "react-hook-form";
import { TextInput, ActionIcon } from "@mantine/core";
import { IgnFormValues } from "../../types/IgnFormValues";

interface Props {
    open: () => void;
    control: Control<IgnFormValues>;
}

const Nav: React.FC<Props> = ({ open, control }) => {
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>logo</div>
            <div>
                <Controller
                    name="ign"
                    defaultValue=""
                    rules={{
                        minLength: 4,
                        maxLength: 12,
                    }}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <TextInput
                            value={value}
                            onChange={onChange}
                            placeholder="Enter your IGN"
                            onKeyPress={(e) => e.key === "Enter" && open()}
                        />
                    )}
                />
                <ActionIcon
                    color="blue"
                    size="lg"
                    variant="filled"
                    onClick={open}
                >
                    +
                </ActionIcon>
            </div>
        </div>
    );
};

export default Nav;
