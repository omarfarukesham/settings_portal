import { SETTINGS_SERVICE_BASE_URL } from '@/configuration/config';
import Area from '@/model/Area';
import PaginatedResponse from '@/model/PaginatedResponse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

//.env file config for getting api endpoint
const config = {
  baseURL: SETTINGS_SERVICE_BASE_URL,
};

//axios calling by this function
function getAreas(filters) {
  return httpService.get('areas', {
    ...config,
    params: {
      ...filters,
      perPage: filters.perPage,
      page: filters.page - 1,
    },
  });
}

//single data calling from this function
export const getArea = (areaId) => {
  return httpService.get(`areas/${areaId}`, {
    ...config,
  });
};

//get all data from area api following the filters conditions
export const useGetAreas = (filters) => {
  return useQuery({
    queryKey: ['areas', JSON.stringify(filters)],
    queryFn: () => getAreas(filters),
    refetchOnWindowFocus: false,
    select: (response) => new PaginatedResponse(response.data.data, Area),
  });
};

//Area data add service function here
const addArea = (area) => {
  return httpService.post('areas', area, {
    ...config,
  });
};

//Single Edit data of state functional service here ....
const editArea = (area) => {
  return httpService.put(`areas/${area.id}`, area, {
    ...config,
  });
};

//Get single data to view data on modal service here ...
export const useGetSingleArea = (areaId) => {
  return useQuery({
    queryKey: ['areas', areaId],
    queryFn: () => getArea(areaId),
    refetchOnWindowFocus: false,
    select: (response) => new Area(response.data?.data?.content[0]),
  });
};

//data create from ui to db service ...
export const useAddArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-areas'],
    mutationFn: addArea,
    select: (response) => new Area(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] });
    },
  });
};

// Edit any single data from UI and update to db service here ...
export const useEditArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-area'],
    mutationFn: editArea,
    select: (response) => new Area(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: ['areas', payload.id] });
      queryClient.invalidateQueries({ queryKey: ['areas'] });
    },
  });
};

//export all service as default ...
const areaSettingService = {
  getArea,
  useGetSingleArea,
  useAddArea,
  useEditArea,
};

export default areaSettingService;
