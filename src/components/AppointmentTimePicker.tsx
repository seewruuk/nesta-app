import { useState } from "react";
import { ReservedAppointment } from "../data/offers";
import {Pressable, ScrollView, View, Text, Platform} from "react-native";
import dayjs from "dayjs";
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';


const HOURS = Array.from({ length: 11 }, (_, i) => `${8 + i}:00`);


interface AppointmentTimePickerProps {
    onConfirmReservation: (date: string, time: string) => void;
    reservedAppointments: ReservedAppointment[];
}

export default function AppointmentTimePicker({
                                                  onConfirmReservation,
                                                  reservedAppointments,
                                              }: AppointmentTimePickerProps) {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);


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
            onConfirmReservation(selectedDate.format('YYYY-MM-DD'), selectedTime);
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
            ra => ra.date === selectedDate.format('YYYY-MM-DD') && ra.time === hour
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
                <Pressable onPress={() => setShowDatePicker(true)}>
                    <Text className="text-base font-medium underline">
                        {selectedDate.format('DD MMMM YYYY')}
                    </Text>
                </Pressable>
                <Pressable onPress={() => setSelectedDate(prev => prev.add(1, 'day'))}>
                    <Text className="text-lg">{'→'}</Text>
                </Pressable>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    value={selectedDate.toDate()}
                    onChange={onChangeDate}
                />
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
            >
                <View className="bg-white p-6 rounded-lg items-center">
                    <Text className="text-base mb-4 text-center">
                        Czy na pewno chcesz zarezerwować{" "}
                        <Text className="font-semibold">
                            {selectedDate.format('DD.MM.YYYY')} o {selectedTime}?
                        </Text>
                    </Text>

                    <View className="flex-row gap-6">
                        <Pressable onPress={() => setShowConfirm(false)}>
                            <Text className="text-red-500 font-medium">Anuluj</Text>
                        </Pressable>
                        <Pressable onPress={handleConfirm}>
                            <Text className="text-blue-600 font-semibold">Potwierdź</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}