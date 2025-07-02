// 'use client'
// import React, { useEffect, useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import Input from '@/components/form/input/InputField';
// import Logo from '@/components/ui/logo/Logo';
// import Badge from '@/components/ui/badge/Badge';
// import { axiosInstance } from '@/config/axios';
// import { Facility } from '@/types';

// const defaultCenter = {
//     lat: 48.8566, // Paris
//     lng: 2.3522
// };

// const GoogleMapComponent = () => {
//     const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [facilities, setFacilitis] = useState<Facility[]>([])

//     useEffect(() => {
//         axiosInstance.get("/facilities").then(({ data }) => {

//             console.log({ data })
//             setFacilitis(data)
//         }).catch(err => {
//             console.error(err)
//         })
//     }, [])

//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     setUserPosition({
//                         lat: position.coords.latitude,
//                         lng: position.coords.longitude
//                     });
//                     setLoading(false);
//                 },
//                 (err) => {
//                     setError(err.message);
//                     setLoading(false);
//                     console.error("Erreur de géolocalisation:", err);
//                 },
//                 {
//                     enableHighAccuracy: true,
//                     timeout: 5000,
//                     maximumAge: 0
//                 }
//             );
//         } else {
//             setError("La géolocalisation n'est pas supportée par votre navigateur");
//             setLoading(false);
//         }
//     }, []);

//     if (loading) {
//         return <div className="h-[400px] flex items-center justify-center">Chargement de la position...</div>;
//     }

//     if (error) {
//         return (
//             <div className="h-[400px] flex items-center justify-center text-red-500">
//                 Erreur: {error}. Affichage de la carte avec position par défaut.
//             </div>
//         );
//     }

//     console.log({ userPosition })

//     return (
//         <div className='m-5'>
//             <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
//                 <div className='my-5'>
//                     <div className='flex justify-center my-4'>
//                         <Logo />
//                     </div>
//                     <div className="sm:col-span-1">
//                         <Input
//                             type="text"
//                             placeholder="Effectuez une recherche de pharmacie ou d'hopital"
//                         />
//                     </div>
//                 </div>
//                 <div className='flex flex-col md:flex-row gap-4'>
//                     {
//                         facilities.map((facility) => (
//                             <div className='w-full md:w-1/4 lg:w-2/5 bg-gray-50  rounded-lg'>

//                                 <div className='border p-4 rounded-sm cursor-pointer hover:border-blue-600 transition-all'>
//                                     <div className='flex justify-between w-full'>
//                                         <div className='text-slate-800 text-sm'>{facility.name}</div>
//                                         <div className='text-slate-500'>3km</div>
//                                     </div>
//                                     <div className='flex justify-between w-full'>
//                                         <div className='text-slate-700 text-xs'>{facility.address}</div>
//                                         <div className='text-slate-500 text-xs'>
//                                             4.5 de notation
//                                         </div>
//                                     </div>
//                                     <div className='mt-3'>
//                                         <Badge color='success'>Ouvert</Badge>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     }


//                     <div className='w-full md:w-3/4 lg:w-4/5'>
//                         <GoogleMap
//                             mapContainerStyle={{
//                                 width: '100%',
//                                 height: '500px', // Hauteur ajustable
//                                 borderRadius: '8px',
//                                 boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//                             }}
//                             center={userPosition || defaultCenter}
//                             zoom={15}
//                         >
//                             {userPosition && (
//                                 <Marker
//                                     position={userPosition}
//                                     title="Votre position"
//                                 />
//                             )}
//                         </GoogleMap>
//                     </div>
//                 </div>

//             </LoadScript>
//         </div>

//     );
// };

// export default GoogleMapComponent;





'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import Input from '@/components/form/input/InputField';
import Logo from '@/components/ui/logo/Logo';
import Badge from '@/components/ui/badge/Badge';
import { axiosInstance } from '@/config/axios';
import { Facility } from '@/types';

const defaultCenter = {
    lat: 48.8566,
    lng: 2.3522
};

const GoogleMapComponent = () => {
    const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    // Chargement des établissements
    useEffect(() => {
        axiosInstance.get("/facilities").then(({ data }) => {
            setFacilities(data);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    // Géolocalisation de l'utilisateur
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setLoading(false);
                },
                (err) => {
                    setError(err.message);
                    setLoading(false);
                    console.error("Erreur de géolocalisation:", err);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            setError("La géolocalisation n'est pas supportée par votre navigateur");
            setLoading(false);
        }
    }, []);

    // Calcul de l'itinéraire quand un établissement est sélectionné
    useEffect(() => {
        if (selectedFacility && userPosition && map) {
            const directionsService = new google.maps.DirectionsService();
            
            directionsService.route(
                {
                    origin: userPosition,
                    destination: {
                        lat: selectedFacility.latitude,
                        lng: selectedFacility.longitude
                    },
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        console.error(`Erreur lors du calcul de l'itinéraire: ${status}`);
                    }
                }
            );
        }
    }, [selectedFacility, userPosition, map]);


    console.log({userPosition})
    
    const handleFacilityClick = useCallback((facility: Facility) => {
        setSelectedFacility(facility);
    }, []);

    const onMapLoad = useCallback((map: google.maps.Map) => {
        setMap(map);
    }, []);

    if (loading) {
        return <div className="h-[400px] flex items-center justify-center">Chargement de la position...</div>;
    }

    if (error) {
        return (
            <div className="h-[400px] flex items-center justify-center text-red-500">
                Erreur: {error}. Affichage de la carte avec position par défaut.
            </div>
        );
    }

    return (
        <div className='m-5'>
            <LoadScript 
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
                libraries={['places']}
            >
                <div className='my-5'>
                    <div className='flex justify-center my-4'>
                        <Logo />
                    </div>
                    <div className="sm:col-span-1">
                        <Input
                            type="text"
                            placeholder="Effectuez une recherche de pharmacie ou d'hopital"
                        />
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full md:w-1/4 lg:w-2/5 bg-gray-50 rounded-lg max-h-[500px] overflow-y-auto'>
                        {facilities.map((facility) => (
                            <div 
                                key={facility.id}
                                className={`border p-4 rounded-sm cursor-pointer hover:border-blue-600 transition-all ${selectedFacility?.id === facility.id ? 'border-blue-600 bg-blue-50' : ''}`}
                                onClick={() => handleFacilityClick(facility)}
                            >
                                <div className='flex justify-between w-full'>
                                    <div className='text-slate-800 text-sm font-medium'>{facility.name}</div>
                                    <div className='text-slate-500'>
                                        {userPosition && (
                                            `${calculateDistance(
                                                userPosition.lat,
                                                userPosition.lng,
                                                facility.latitude,
                                                facility.longitude
                                            ).toFixed(1)} km`
                                        )}
                                    </div>
                                </div>
                                <div className='flex justify-between w-full mt-1'>
                                    <div className='text-slate-700 text-xs'>{facility.address}</div>
                                    <div className='text-slate-500 text-xs'>
                                        4.5 ★
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <Badge color='success'>Ouvert</Badge>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='w-full md:w-3/4 lg:w-4/5'>
                        <GoogleMap
                            mapContainerStyle={{
                                width: '100%',
                                height: '500px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                            center={userPosition || defaultCenter}
                            zoom={15}
                            onLoad={onMapLoad}
                        >
                            {userPosition && (
                                <Marker
                                    position={userPosition}
                                    title="Votre position"
                                    icon={{
                                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                                    }}
                                />
                            )}

                            {facilities.map((facility) => (
                                <Marker
                                    key={facility.id}
                                    position={{
                                        lat: facility.latitude,
                                        lng: facility.longitude
                                    }}
                                    title={facility.name}
                                    icon={{
                                        url: facility.type === 'PHARMACY' 
                                            ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                                            : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                    }}
                                />
                            ))}

                            {directions && (
                                <DirectionsRenderer
                                    directions={directions}
                                    options={{
                                        polylineOptions: {
                                            strokeColor: "#3b82f6",
                                            strokeWeight: 5,
                                        },
                                        suppressMarkers: true,
                                    }}
                                />
                            )}
                        </GoogleMap>
                    </div>
                </div>
            </LoadScript>
        </div>
    );
};

// Fonction pour calculer la distance en km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

export default GoogleMapComponent;