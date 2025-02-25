import { SETTINGS_SERVICE_BASE_URL } from '@/configuration/config';
import PaginatedResponse from '@/model/PaginatedResponse';
import Zone from '@/model/Zone';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

//.env file config for getting api endpoint
const config = {
  baseURL: SETTINGS_SERVICE_BASE_URL,
};

//axios calling by this function
function getZones(filters) {
  return httpService.get('zones', {
    ...config,
    params: {
      ...filters,
      perPage: filters.perPage,
      page: filters.page - 1,
    },
  });
}

//single data calling from this function
export const getZone = (zoneId) => {
  return httpService.get(`zones/${zoneId}`, {
    ...config,
  });
};

//get all data from zone api following the filters conditions
export const useGetZones = (filters) => {
  return useQuery({
    queryKey: ['zones', JSON.stringify(filters)],
    queryFn: () => getZones(filters),
    refetchOnWindowFocus: false,
    select: (response) => new PaginatedResponse(response.data.data, Zone),
  });
};

//Zone data add service function here
const addZone = (zone) => {
  return httpService.post('zones', zone, {
    ...config,
  });
};

//Single Edit data of zone functional service here ....
const editZone = (zone) => {
  return httpService.put(`zones/${zone.id}`, zone, {
    ...config,
  });
};

//Get single data to view data on modal service here ...
export const useGetSingleZone = (zoneId) => {
  return useQuery({
    queryKey: ['zones', zoneId],
    queryFn: () => getZone(zoneId),
    refetchOnWindowFocus: false,
    select: (response) => new Zone(response.data?.data?.content[0]),
  });
};

//data create from ui to db service ...
export const useAddZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-zones'],
    mutationFn: addZone,
    select: (response) => new Zone(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};

// Edit any single data from UI and update to db service here ...
export const useEditZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-area'],
    mutationFn: editZone,
    select: (response) => new Zone(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: ['zones', payload.id] });
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};

//export all service as default ...
const zoneSettingService = {
  getZone,
  useGetSingleZone,
  useAddZone,
  useEditZone,
};

export default zoneSettingService;
