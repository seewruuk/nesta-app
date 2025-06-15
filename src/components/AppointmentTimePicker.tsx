import dayjs from 'dayjs';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const HOURS = Array.from({ length: 11 }, (_, i) => `${8 + i}:00`);

export default function AppointmentTimePicker() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleDayChange = (direction: 'prev' | 'next') => {
        setSelectedDate(prev =>
            direction === 'prev' ? prev.subtract(1, 'day') : prev.add(1, 'day')
        );
    };

    return (
        <View className="bg-white p-4">
            {/* Date navigation */}
            <View className="flex-row items-center justify-between mb-4">
                <Pressable onPress={() => handleDayChange('prev')}>
                    <Text className="text-lg">{'←'}</Text>
                </Pressable>
                <Text className="text-base font-medium">
                    {selectedDate.format('DD MMMM YYYY')}
                </Text>
                <Pressable onPress={() => handleDayChange('next')}>
                    <Text className="text-lg">{'→'}</Text>
                </Pressable>
            </View>

            {/* Time slots */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {HOURS.map(hour => {
                    const isSelected = hour === selectedTime;
                    return (
                        <Pressable
                            key={hour}
                            onPress={() => setSelectedTime(hour)}
                            className={`px-4 py-2 rounded-lg border mx-1 ${
                                isSelected ? 'bg-cyan-600' : 'bg-white'
                            }`}
                            style={{
                                borderColor: isSelected ? '#0e7490' : '#ccc',
                            }}
                        >
                            <Text
                                className={`text-sm ${
                                    isSelected ? 'text-white font-bold' : 'text-gray-700'
                                }`}
                            >
                                {hour}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}
