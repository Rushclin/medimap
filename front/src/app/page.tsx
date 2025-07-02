// "use client"

// import { useState, useEffect, useRef } from "react"
// import { MapPin, Search, Filter, Navigation, Clock, Star } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Checkbox } from "@/components/ui/checkbox"
// // import { Card, CardContent } from "@/components/ui/card"
// // import { Badge } from "@/components/ui/badge"
// // import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// interface Location {
//   id: string
//   name: string
//   address: string
//   type: "pharmacy" | "hospital"
//   rating: number
//   distance: number
//   isOpen: boolean
//   specialties?: string[]
//   lat: number
//   lng: number
// }

// export default function PharmacyHospitalLocator() {
//   const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
//   const [selectedType, setSelectedType] = useState<"pharmacy" | "hospital">("pharmacy")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [openOnly, setOpenOnly] = useState(false)
//   const [selectedFilters, setSelectedFilters] = useState<string[]>([])
//   const [locations, setLocations] = useState<Location[]>([])
//   const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
//   const [showMap, setShowMap] = useState(false)
//   const [locationPermission, setLocationPermission] = useState<"pending" | "granted" | "denied">("pending")

//   const mapRef = useRef<HTMLDivElement>(null)
//   const googleMapRef = useRef<any | null>(null)
//   const directionsServiceRef = useRef<any | null>(null)
//   const directionsRendererRef = useRef<any | null>(null)

//   // Mock data - En production, ceci viendrait d'une API
//   const mockLocations: Location[] = [
//     {
//       id: "1",
//       name: "Pharmacie de la Gare",
//       address: "Avenue de Garneve",
//       type: "pharmacy",
//       rating: 4.5,
//       distance: 2,
//       isOpen: true,
//       lat: 48.8566,
//       lng: 2.3522,
//     },
//     {
//       id: "2",
//       name: "Pharmacie Centrale",
//       address: "20 rue Crats-Santre",
//       type: "pharmacy",
//       rating: 4.2,
//       distance: 3,
//       isOpen: true,
//       lat: 48.8576,
//       lng: 2.3532,
//     },
//     {
//       id: "3",
//       name: "Pharmacie du Centre",
//       address: "Avenue du Centrum",
//       type: "pharmacy",
//       rating: 4.3,
//       distance: 3,
//       isOpen: false,
//       lat: 48.8586,
//       lng: 2.3542,
//     },
//     {
//       id: "4",
//       name: "Hôpital Saint-Louis",
//       address: "1 Avenue Claude Vellefaux",
//       type: "hospital",
//       rating: 4.1,
//       distance: 1.5,
//       isOpen: true,
//       specialties: ["Cardiologie", "Pédiatrie"],
//       lat: 48.8706,
//       lng: 2.3662,
//     },
//     {
//       id: "5",
//       name: "Hôpital Bichat",
//       address: "46 Rue Henri Huchard",
//       type: "hospital",
//       rating: 4.0,
//       distance: 2.8,
//       isOpen: true,
//       specialties: ["Cardiologie"],
//       lat: 48.8996,
//       lng: 2.3306,
//     },
//   ]

//   // Demander la géolocalisation au chargement
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           })
//           setLocationPermission("granted")
//         },
//         (error) => {
//           console.error("Erreur de géolocalisation:", error)
//           setLocationPermission("denied")
//           // Position par défaut (Paris)
//           setUserLocation({ lat: 48.8566, lng: 2.3522 })
//         },
//       )
//     } else {
//       setLocationPermission("denied")
//       setUserLocation({ lat: 48.8566, lng: 2.3522 })
//     }
//   }, [])

//   // Initialiser Google Maps
//   useEffect(() => {
//     if (userLocation && mapRef.current && !googleMapRef.current) {
//       const initMap = () => {
//         if (window.google && mapRef.current) {
//           googleMapRef.current = new window.google.maps.Map(mapRef.current, {
//             center: userLocation,
//             zoom: 14,
//             styles: [
//               {
//                 featureType: "poi",
//                 elementType: "labels",
//                 stylers: [{ visibility: "off" }],
//               },
//             ],
//           })

//           // Marqueur pour la position de l'utilisateur
//           new window.google.maps.Marker({
//             position: userLocation,
//             map: googleMapRef.current,
//             title: "Votre position",
//             icon: {
//               url:
//                 "data:image/svg+xml;charset=UTF-8," +
//                 encodeURIComponent(`
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
//                   <circle cx="12" cy="12" r="3" fill="#ffffff"/>
//                 </svg>
//               `),
//               scaledSize: new window.google.maps.Size(24, 24),
//             },
//           })

//           directionsServiceRef.current = new window.google.maps.DirectionsService()
//           directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
//             suppressMarkers: false,
//             polylineOptions: {
//               strokeColor: "#3b82f6",
//               strokeWeight: 4,
//             },
//           })
//           directionsRendererRef.current.setMap(googleMapRef.current)
//         }
//       }

//       if (window.google) {
//         initMap()
//       } else {
//         const script = document.createElement("script")
//         script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`
//         script.async = true
//         script.onload = initMap
//         document.head.appendChild(script)
//       }
//     }
//   }, [userLocation])

//   // Filtrer les locations
//   useEffect(() => {
//     let filtered = mockLocations.filter((location) => location.type === selectedType)

//     if (openOnly) {
//       filtered = filtered.filter((location) => location.isOpen)
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(
//         (location) =>
//           location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           location.address.toLowerCase().includes(searchQuery.toLowerCase()),
//       )
//     }

//     if (selectedFilters.length > 0 && selectedType === "hospital") {
//       filtered = filtered.filter((location) =>
//         location.specialties?.some((specialty) => selectedFilters.includes(specialty)),
//       )
//     }

//     setLocations(filtered)
//   }, [selectedType, searchQuery, openOnly, selectedFilters])

//   // Afficher les marqueurs sur la carte
//   useEffect(() => {
//     if (googleMapRef.current && locations.length > 0) {
//       // Nettoyer les anciens marqueurs (sauf celui de l'utilisateur)
//       locations.forEach((location) => {
//         const marker = new window.google.maps.Marker({
//           position: { lat: location.lat, lng: location.lng },
//           map: googleMapRef.current,
//           title: location.name,
//           icon: {
//             url:
//               location.type === "pharmacy"
//                 ? "data:image/svg+xml;charset=UTF-8," +
//                   encodeURIComponent(`
//                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <rect x="3" y="3" width="18" height="18" rx="2" fill="#10b981" stroke="#ffffff" strokeWidth="2"/>
//                     <path d="M12 8v8M8 12h8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
//                   </svg>
//                 `)
//                 : "data:image/svg+xml;charset=UTF-8," +
//                   encodeURIComponent(`
//                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <rect x="3" y="3" width="18" height="18" rx="2" fill="#ef4444" stroke="#ffffff" strokeWidth="2"/>
//                     <path d="M12 8v8M8 12h8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
//                   </svg>
//                 `),
//             scaledSize: new window.google.maps.Size(32, 32),
//           },
//         })

//         marker.addListener("click", () => {
//           setSelectedLocation(location)
//           calculateRoute(location)
//         })
//       })
//     }
//   }, [locations])

//   const calculateRoute = (destination: Location) => {
//     if (directionsServiceRef.current && directionsRendererRef.current && userLocation) {
//       directionsServiceRef.current.route(
//         {
//           origin: userLocation,
//           destination: { lat: destination.lat, lng: destination.lng },
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === "OK" && result) {
//             directionsRendererRef.current?.setDirections(result)
//           }
//         },
//       )
//     }
//   }

//   const handleLocationSelect = (location: Location) => {
//     setSelectedLocation(location)
//     calculateRoute(location)
//     if (window.innerWidth < 768) {
//       setShowMap(true)
//     }
//   }

//   const specialtyFilters = ["Cardiologie", "Pédiatrie", "Urgences", "Chirurgie"]

//   if (locationPermission === "pending") {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <Card className="w-full max-w-md">
//           <CardContent className="p-6 text-center">
//             <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
//             <h2 className="text-xl font-semibold mb-2">Autorisation de localisation</h2>
//             <p className="text-gray-600 mb-4">
//               Nous avons besoin d'accéder à votre position pour vous montrer les pharmacies et hôpitaux les plus
//               proches.
//             </p>
//             <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//               <MapPin className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900">Pharmacies et Hôpitaux</h1>
//             {locationPermission === "denied" && (
//               <Badge variant="outline" className="text-orange-600 border-orange-200">
//                 Position approximative
//               </Badge>
//             )}
//           </div>

//           {/* Search and Tabs */}
//           <div className="space-y-4">
//             <div className="flex gap-2">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Saisissez un lieu"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//               <Button className="bg-blue-500 hover:bg-blue-600">Rechercher</Button>
//             </div>

//             <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as "pharmacy" | "hospital")}>
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="pharmacy">Pharmacies</TabsTrigger>
//                 <TabsTrigger value="hospital">Hôpitaux</TabsTrigger>
//               </TabsList>
//             </Tabs>

//             <div className="flex items-center gap-4">
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="open-now"
//                   checked={openOnly}
//                   onCheckedChange={(checked) => setOpenOnly(checked as boolean)}
//                 />
//                 <label htmlFor="open-now" className="text-sm font-medium flex items-center gap-1">
//                   <Clock className="w-4 h-4" />
//                   Ouvertes maintenant
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-4">
//         <div className="grid lg:grid-cols-2 gap-6">
//           {/* Sidebar */}
//           <div className={`space-y-4 ${showMap ? "hidden lg:block" : ""}`}>
//             {/* Filters */}
//             {selectedType === "hospital" && (
//               <Card>
//                 <CardContent className="p-4">
//                   <div className="flex items-center gap-2 mb-3">
//                     <Filter className="w-4 h-4" />
//                     <h3 className="font-semibold">Filtres</h3>
//                   </div>
//                   <div className="space-y-2">
//                     {specialtyFilters.map((filter) => (
//                       <div key={filter} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={filter}
//                           checked={selectedFilters.includes(filter)}
//                           onCheckedChange={(checked) => {
//                             if (checked) {
//                               setSelectedFilters([...selectedFilters, filter])
//                             } else {
//                               setSelectedFilters(selectedFilters.filter((f) => f !== filter))
//                             }
//                           }}
//                         />
//                         <label htmlFor={filter} className="text-sm">
//                           {filter}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Results */}
//             <div className="space-y-3">
//               {locations.map((location) => (
//                 <Card
//                   key={location.id}
//                   className={`cursor-pointer transition-all hover:shadow-md ${
//                     selectedLocation?.id === location.id ? "ring-2 ring-blue-500" : ""
//                   }`}
//                   onClick={() => handleLocationSelect(location)}
//                 >
//                   <CardContent className="p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <h3 className="font-semibold text-lg">{location.name}</h3>
//                         <p className="text-gray-600 text-sm">{location.address}</p>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-sm text-gray-500">{location.distance} km</div>
//                         <div className="flex items-center gap-1">
//                           <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                           <span className="text-sm">{location.rating}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         {location.isOpen ? (
//                           <Badge className="bg-green-100 text-green-800">Ouvert</Badge>
//                         ) : (
//                           <Badge variant="secondary">Fermé</Badge>
//                         )}
//                         {location.specialties && (
//                           <div className="flex gap-1">
//                             {location.specialties.slice(0, 2).map((specialty) => (
//                               <Badge key={specialty} variant="outline" className="text-xs">
//                                 {specialty}
//                               </Badge>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="lg:hidden bg-transparent"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           setShowMap(true)
//                         }}
//                       >
//                         <Navigation className="w-4 h-4 mr-1" />
//                         Itinéraire
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>

//           {/* Map */}
//           <div className={`lg:block ${showMap ? "block" : "hidden"}`}>
//             <Card className="h-[600px] lg:h-[800px]">
//               <CardContent className="p-0 h-full relative">
//                 <div className="lg:hidden absolute top-4 left-4 z-10">
//                   <Button variant="outline" size="sm" onClick={() => setShowMap(false)}>
//                     ← Retour à la liste
//                   </Button>
//                 </div>
//                 <div ref={mapRef} className="w-full h-full rounded-lg" />
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// import React from 'react'

// const Page = () => {
//   return (
//    <div className="min-h-screen bg-gray-50">
//     hksks
//     </div>
//   )
// }

// export default Page

'use client'
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Logo from '@/components/ui/logo/Logo';
import Badge from '@/components/ui/badge/Badge';

const containerStyle = {
  width: '100%',
  height: '400px'
};

// Position par défaut (utilisée si la géolocalisation échoue)
const defaultCenter = {
  lat: 48.8566, // Paris
  lng: 2.3522
};

const GoogleMapComponent = () => {
  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  console.log({userPosition})

  return (
    <div className='m-5'>
     <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <div className='my-5'>
        <div className='flex justify-center my-4'>
            <Logo/>
        </div>
 <div className="sm:col-span-1">
                    <Input
                      type="text"
                      placeholder="Effectuez une recherche de pharmacie ou d'hopital"
                    />
                  </div>
      </div>
       <div className='flex flex-col md:flex-row gap-4'>
  <div className='w-full md:w-1/4 lg:w-2/5 bg-gray-50  rounded-lg'>

    <div className='border p-4 rounded-sm cursor-pointer hover:border-blue-600 transition-all'>
        <div className='flex justify-between w-full'>
            <div className='text-slate-800 text-sm'>Ma pharmacie a moi</div>
            <div className='text-slate-500'>3km</div>
        </div>
        <div className='flex justify-between w-full'>
            <div className='text-slate-700 text-xs'>Avenu de la gare sur Marene</div>
            <div className='text-slate-500 text-xs'>
                4.5 de notation
            </div>
        </div>
        <div className='mt-3'>
            <Badge color='success'>Ouvert</Badge>
        </div>
    </div>
  </div>

  <div className='w-full md:w-3/4 lg:w-4/5'>
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '500px', // Hauteur ajustable
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
      center={userPosition || defaultCenter}
      zoom={15}
    >
      {userPosition && (
        <Marker 
          position={userPosition}
          title="Votre position"
        />
      )}
    </GoogleMap>
  </div>
</div>
      
    </LoadScript>
    </div>
   
  );
};

export default GoogleMapComponent;
