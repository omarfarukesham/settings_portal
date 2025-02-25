import { SETTINGS_SERVICE_BASE_URL } from '@/configuration/config';
import Language from '@/model/Language';
import PaginatedResponse from '@/model/PaginatedResponse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

//.env file config for getting api endpoint
const config = {
  baseURL: SETTINGS_SERVICE_BASE_URL,
};

//axios calling by this function
function getLanguages(filters) {
  return httpService.get('languages', {
    ...config,
    params: {
      ...filters,
      perPage: filters.perPage,
      page: filters.page - 1,
    },
  });
}

//single data calling from this function
export const getLanguage = (languageId) => {
  return httpService.get(`languages/${languageId}`, {
    ...config,
  });
};

//get all data from  api following the filters conditions
export const useGetLanguages = (filters) => {
  return useQuery({
    queryKey: ['languages', JSON.stringify(filters)],
    queryFn: () => getLanguages(filters),
    refetchOnWindowFocus: false,
    select: (response) => new PaginatedResponse(response.data.data, Language),
  });
};

// Data add service function here
const addLanguage = (language) => {
  return httpService.post('languages', language, {
    ...config,
  });
};

//Single Edit data of zone functional service here ....
const editLanguage = (language) => {
  return httpService.put(`languages/${language.id}`, language, {
    ...config,
  });
};

//Get single data to view data on modal service here ...
export const useGetSingleLanguage = (languageId) => {
  return useQuery({
    queryKey: ['languages', languageId],
    queryFn: () => getLanguage(languageId),
    refetchOnWindowFocus: false,
    select: (response) => new Language(response.data?.data?.content[0]),
  });
};

//data create from ui to db  ...
export const useAddLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-languages'],
    mutationFn: addLanguage,
    select: (response) => new Language(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
};

// Edit any single data from UI and update to db service here ...
export const useEditLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-area'],
    mutationFn: editLanguage,
    select: (response) => new Language(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: ['languages', payload.id] });
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
};

//export all service as default ...
const languageSettingService = {
  getLanguage,
  useGetSingleLanguage,
  useAddLanguage,
  useEditLanguage,
};

export default languageSettingService;
