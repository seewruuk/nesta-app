import { useState, useMemo  } from "react";
import { ReservedAppointment } from "../data/offers";
import {Pressable, ScrollView, View, Text, Platform} from "react-native";
import dayjs from "dayjs";
import 'dayjs/locale/pl';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import {translation} from "@/src/translation";
import {useStateContext} from "@/src/contexts/StateContext";

dayjs.extend(localizedFormat);

const HOURS = Array.from({ length: 11 }, (_, i) => `${8 + i}:00`);


interface AppointmentTimePickerProps {
    onConfirmReservation: (date: string, time: string) => void;
    reservedAppointments: ReservedAppointment[];
    testID: string;
}

export default function AppointmentTimePicker({
                                                  onConfirmReservation,
                                                  reservedAppointments,
                                              }: AppointmentTimePickerProps) {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { langId } = useStateContext();

    const locale = useMemo(() => {
        if (langId === 'pl') return 'pl';
        if (langId === 'en') return 'en';
        return 'en';
    }, [langId]);

    const formattedDate = useMemo(() => {
        return dayjs(selectedDate).locale(locale).format('DD MMMM YYYY');
    }, [selectedDate, locale]);

    /**
     * Handles the selection of a specific hour slot.
     * Sets the selected time and triggers the confirmation modal.
     *
     * @param hour - Time slot selected by the user (e.g., "10:00").
     */
    const handleSelectTime = (hour: string) => {
        setSelectedTime(hour);
        setShowConfirm(true);
    };

    /**
     * Confirms the appointment reservation.
     * Triggers the parent callback with selected date and time, and hides the modal.
     */
    const handleConfirm = () => {
        if (selectedTime) {
            onConfirmReservation(formattedDate, selectedTime);
            setShowConfirm(false);
        }
    };

    /**
     * Checks if a specific hour on the currently selected date is already reserved.
     *
     * @param hour - Time slot to check (e.g., "14:00").
     * @returns True if the hour is already reserved for the selected date.
     */
    const isTimeReserved = (hour: string) => {
        return reservedAppointments.some(
            ra => ra.date === formattedDate && ra.time === hour
        );
    };


    /**
     * Callback for the native date picker.
     * Updates the selected date if a new one is picked and closes the picker.
     *
     * @param event - The event triggered by the DateTimePicker.
     * @param selected - The selected Date object, if any.
     */
    const onChangeDate = (event: any, selected?: Date) => {
        setShowDatePicker(false);
        if (selected) {
            setSelectedDate(dayjs(selected));
        }
    };

    return (
        <View className="bg-white p-4">
            <View className="flex-row items-center justify-between mb-4">
                <Pressable onPress={() => setSelectedDate(prev => prev.subtract(1, 'day'))}>
                    <Text className="text-lg">{'←'}</Text>
                </Pressable>
                <Pressable testID={"open-date-picker"} onPress={() => setShowDatePicker(true)}>
                    <Text className="text-base font-medium underline">
                        {formattedDate}
                    </Text>
                </Pressable>
                <Pressable onPress={() => setSelectedDate(prev => prev.add(1, 'day'))}>
                    <Text className="text-lg">{'→'}</Text>
                </Pressable>
            </View>

            {showDatePicker && (
                <View testID="RNDateTimePicker">
                    <DateTimePicker
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                        value={selectedDate.toDate()}
                        onChange={onChangeDate}
                    />
                </View>
            )}

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {HOURS.map(hour => {
                    const isSelected = hour === selectedTime;
                    const isReserved = isTimeReserved(hour);

                    return (
                        <Pressable
                            key={hour}
                            disabled={isReserved}
                            onPress={() => handleSelectTime(hour)}
                            className={`px-4 py-2 rounded-lg border mx-1 ${
                                isReserved
                                    ? 'bg-gray-300'
                                    : isSelected
                                        ? 'bg-cyan-600'
                                        : 'bg-white'
                            }`}
                            style={{
                                borderColor: isSelected ? '#0e7490' : '#ccc',
                            }}
                            testID={`time-button-${hour}`}
                        >
                            <Text
                                className={`text-sm ${
                                    isReserved
                                        ? 'text-gray-500'
                                        : isSelected
                                            ? 'text-white font-bold'
                                            : 'text-gray-700'
                                }`}
                            >
                                {hour}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>

            <Modal
                isVisible={showConfirm}
                onBackdropPress={() => setShowConfirm(false)}
                backdropOpacity={0.4}
                animationIn="zoomIn"
                animationOut="zoomOut"
                backdropTransitionOutTiming={0}
                testID={"confirm-modal"}
            >
                <View className="bg-white p-6 rounded-lg items-center">
                    <Text className="text-base mb-4 text-center">
                        {translation[langId].appointmentTimePicker.confirmText}{" "}
                        <Text className="font-semibold">
                            {formattedDate} o {selectedTime}?
                        </Text>
                    </Text>

                    <View className="flex-row gap-6">
                        <Pressable testID={"cancel-reservation"} onPress={() => setShowConfirm(false)}>
                            <Text className="text-red-500 font-medium">{translation[langId].appointmentTimePicker.cancelButtonText}</Text>
                        </Pressable>
                        <Pressable onPress={handleConfirm}>
                            <Text className="text-blue-600 font-semibold">{translation[langId].appointmentTimePicker.confirmButtonText}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}