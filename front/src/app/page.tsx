

'use client'
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Input from '@/components/form/input/InputField';
import Logo from '@/components/ui/logo/Logo';
import Badge from '@/components/ui/badge/Badge';
import { axiosInstance } from '@/config/axios';
import { Facility } from '@/types';


import {Locate, Search} from "lucide-react"



const SearchComponent = ({ 
  onSearch,
  onNearbySearch 
}: {
  onSearch: (query: string) => void;
  onNearbySearch: (query: string, userPos: { lat: number; lng: number }) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [isNearby, setIsNearby] = useState(false);

  // Récupérer la position de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          setIsNearby(false); // Désactiver la recherche proche si la géoloc échoue
        }
      );
    }
  }, []);

  const handleSearch = () => {
    if (isNearby && userPosition) {
      onNearbySearch(searchQuery, userPosition);
    } else {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="sm:col-span-1 relative">
      <Input
        type="text"
        placeholder="Effectuez une recherche de pharmacie ou d'hôpital"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="pr-12" // Ajouter du padding pour le bouton
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
        <button
          onClick={() => {
            setIsNearby(!isNearby);
            handleSearch();
          }}
          className={`p-2 rounded-md ${isNearby ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          title={isNearby ? "Recherche proche activée" : "Rechercher près de moi"}
          disabled={!userPosition && isNearby}
        >
          <Locate />
        </button>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-md"
          title="Lancer la recherche"
        >
          <Search />
        </button>
      </div>
    </div>
  );
};









// Configuration des icônes personnalisées
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const pharmacyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Composant pour centrer la carte sur une position
function CenterMap({ position }: { position: [number, number] }) {
  const map = useMap();
  map.setView(position, 15);
  return null;
}

// Composant pour afficher l'itinéraire
function Routing({ from, to }: { from: [number, number], to: [number, number] }) {
  const [route, setRoute] = useState<[number, number][]>([]);

  useEffect(() => {
    // Utilisation d'OSRM pour le calcul d'itinéraire (gratuit)
    fetch(`https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`)
      .then(res => res.json())
      .then(data => {
        if (data.routes && data.routes[0]) {
          setRoute(data.routes[0].geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]));
        }
      })
      .catch(err => console.error('Erreur de calcul de route:', err));
  }, [from, to]);

  return route.length > 0 ? (
    <Polyline 
      positions={route} 
      color="blue"
      weight={5}
    />
  ) : null;
}

const GoogleMapComponent = () => {
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const [facilities, setFacilities] = useState<Facility[]>([]);
     const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);

    const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
    const mapRef = useRef<L.Map>(null);

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
                    setUserPosition([position.coords.latitude, position.coords.longitude]);
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

    const handleFacilityClick = (facility: Facility) => {
        setSelectedFacility(facility);
        if (mapRef.current) {
            mapRef.current.flyTo([facility.latitude, facility.longitude], 15);
        }
    };

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

     const handleSearch = (query: string) => {
    if (!query) {
      setFilteredFacilities(facilities);
      return;
    }
    const results = facilities.filter(facility => 
      facility.name.toLowerCase().includes(query.toLowerCase()) ||
      facility.address.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFacilities(results);
  };

  // Fonction de recherche proche
  const handleNearbySearch = (query: string, userPos: { lat: number; lng: number }) => {
    let results = [...facilities];
    
    // Filtre par texte si query existe
    if (query) {
      results = results.filter(facility => 
        facility.name.toLowerCase().includes(query.toLowerCase()) ||
        facility.address.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Tri par distance
    results = results
      .map(facility => ({
        ...facility,
        distance: calculateDistance(
          userPos.lat,
          userPos.lng,
          facility.latitude,
          facility.longitude
        )
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20); // Limiter aux 20 plus proches
    
    setFilteredFacilities(results);
  };


    return (
        <div className='m-5'>
            <div className='my-5'>
                <div className='flex justify-center my-4'>
                    <Logo />
                </div>
                {/* <div className="sm:col-span-1">
                    <Input
                        type="text"
                        placeholder="Effectuez une recherche de pharmacie ou d'hopital"
                    />
                </div> */}
                 <SearchComponent 
          onSearch={handleSearch}
          onNearbySearch={handleNearbySearch}
        />
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
                                            userPosition[0],
                                            userPosition[1],
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

                <div className='w-full md:w-3/4 lg:w-4/5 h-[500px] rounded-lg shadow-md'>
                    {userPosition && (
                        <MapContainer
                            center={userPosition}
                            zoom={15}
                            style={{ height: '100%', width: '100%', borderRadius: '8px' }}
                            ref={mapRef}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <CenterMap position={userPosition} />
                            
                            <Marker position={userPosition} icon={userIcon}>
                                <Popup>Votre position</Popup>
                            </Marker>

                            {facilities.map((facility) => (
                                <Marker
                                    key={facility.id}
                                    position={[facility.latitude, facility.longitude]}
                                    icon={facility.type === 'PHARMACY' ? pharmacyIcon : hospitalIcon}
                                >
                                    <Popup>{facility.name}</Popup>
                                </Marker>
                            ))}

                            {selectedFacility && userPosition && (
                                <Routing 
                                    from={userPosition} 
                                    to={[selectedFacility.latitude, selectedFacility.longitude]} 
                                />
                            )}
                        </MapContainer>
                    )}
                </div>
            </div>
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