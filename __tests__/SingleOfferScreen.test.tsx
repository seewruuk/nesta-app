import SingleOfferScreen from "@/src/components/SingleOfferScreen";
import { useStateContext } from "@/src/contexts/StateContext";
import { fireEvent, render, screen } from "@testing-library/react-native";

jest.mock("@/src/contexts/StateContext");

const mockUseStateContext = useStateContext as jest.Mock;

const mockOffer = {
    id: "offer123",
    title: "Piękne mieszkanie w centrum",
    description: "Duże, jasne mieszkanie idealne dla studentów.",
    apartmentId: "apartment123",
    rentPrice: 2500,

    deposit: 2500,
    extraFees: {
        internet: "W cenie",
        utilities: "Dodatkowo płatne"
    },
    availableFrom: "2025-06-20",
    minTermMonths: 12,
    shortTermAllowed: false,
    preferredTenants: ["studenci", "pracujący"],
    parkingIncluded: true,
    elevator: false,
    wheelchairAccess: false,
    petsAllowed: "Małe zwierzęta",
    tvInternet: true,
    heatingType: "Centralne",
    smokingAllowed: "Nie",
    cellar: true
};

const mockApartment = {
    id: "apartment123",
    type: "Studio",
    area: 45,
    roomsCount: 2,
    bedroomsCount: 1,
    bathroomsCount: 1,
    floor: 2,
    furnished: "Tak",
    googleMapsLink: "https://maps.google.com?q=test",
    location: {
        city: "Wrocław",
        district: "Stare Miasto",
        fullAddress: "ul. Długa 1"
    },
    images: ["https://example.com/image.jpg"],
    amenities: ["wifi", "balcony"]
};

const mockAmenities = [
    { id: "wifi", name: "Wi-Fi" },
    { id: "balcony", name: "Balkon" }
];

describe("SingleOfferScreen", () => {
    const setup = () =>
        render(
            <SingleOfferScreen id="offer123" />
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("render single offer screen if the offer and apartment exist", () => {
        mockUseStateContext.mockReturnValue({
            state: {
                offers: [mockOffer],
                apartments: [mockApartment],
                amenities: mockAmenities
            }
        });

        setup();

        expect(screen.getByText("Piękne mieszkanie w centrum")).toBeTruthy();
        expect(screen.getByText("Wrocław, Stare Miasto")).toBeTruthy();
        expect(screen.getByText("Szczegóły oferty")).toBeTruthy();
        expect(screen.getByText("Cena najmu: 2500 PLN")).toBeTruthy();
        expect(screen.getByText("Szczegóły apartamentu")).toBeTruthy();
        expect(
            screen.getAllByText(/Udogodnienia:.*Wi-Fi, Balkon/).length
        ).toBeGreaterThan(0);
    });

    it("shows message if the offer doesnt exist", () => {
        mockUseStateContext.mockReturnValue({
            state: {
                offers: [],
                apartments: [mockApartment],
                amenities: mockAmenities
            }
        });

        setup();
        expect(screen.getByText("Oferta nie znaleziona")).toBeTruthy();
    });

    it("shows message if apartment doesnt exist", () => {
        mockUseStateContext.mockReturnValue({
            state: {
                offers: [mockOffer],
                apartments: [],
                amenities: mockAmenities
            }
        });

        setup();
        expect(screen.getByText("Apartament nie znaleziony")).toBeTruthy();
    });

    it("redirects to google after tapping the link", () => {
        const openURLMock = jest.fn();
        jest.spyOn(require("react-native").Linking, "openURL").mockImplementation(openURLMock);

        mockUseStateContext.mockReturnValue({
            state: {
                offers: [mockOffer],
                apartments: [mockApartment],
                amenities: mockAmenities
            }
        });

        const { getByText } = setup();
        const mapLink = getByText("Zobacz w Google Maps");

        fireEvent.press(mapLink);
        expect(openURLMock).toHaveBeenCalledWith("https://maps.google.com?q=test");
    });
});