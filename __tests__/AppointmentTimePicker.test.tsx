import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import AppointmentTimePicker from "@/src/components/AppointmentTimePicker";
import dayjs from "dayjs";
import { ReservedAppointment } from "@/src/data/offers";
import {wait} from "@testing-library/react-native/build/user-event/utils";

const baseDate = dayjs("2025-06-26");

const reservedAppointments: ReservedAppointment[] = [
    {
        date: baseDate.format("YYYY-MM-DD"),
        time: "10:00",
        userId: "user1",
    },
];

const mockConfirm = jest.fn();

describe("AppointmentTimePicker", () => {
    const setup = () =>
        render(
            <AppointmentTimePicker
                onConfirmReservation={mockConfirm}
                reservedAppointments={reservedAppointments}
                testID="appointment-time-picker"
            />
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });


    it("disables reserved hour buttons", () => {
        setup();
        screen.debug();

        const reservedButton = screen.getByTestId("time-button-10:00");
        expect(reservedButton.props.accessibilityState?.disabled).toBe(true);
    });

    it("opens confirmation modal when selecting a free time", () => {
        setup();
        screen.debug();

        fireEvent.press(screen.getByText("11:00")); // not reserved
        expect(screen.getByText(/Czy na pewno chcesz zarezerwować/)).toBeTruthy();
    });

    it("confirms reservation when pressing 'Potwierdź'", () => {
        setup();
        screen.debug();

        fireEvent.press(screen.getByText("11:00"));
        fireEvent.press(screen.getByText("Potwierdź"));

        expect(mockConfirm).toHaveBeenCalledWith(baseDate.format("YYYY-MM-DD"), "11:00");
    });

    it("closes modal when pressing 'Anuluj'", () => {
        setup();
        screen.debug();

        fireEvent.press(screen.getByTestId("time-button-11:00"));

        const cancelReservationButton = screen.getByTestId("cancel-reservation");

        fireEvent.press(cancelReservationButton);

        expect(cancelReservationButton).not.toBeVisible();
    });

    it("shows DateTimePicker when tapping date", () => {
        setup();

        fireEvent.press(screen.getByTestId("open-date-picker"));
        expect(screen.getByTestId("RNDateTimePicker")).toBeTruthy();
    });
});
