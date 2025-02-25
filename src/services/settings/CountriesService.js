import { SETTINGS_SERVICE_BASE_URL } from '@/configuration/config';
import Country from '@/model/Country';
import Currency from '@/model/Currency';
import Language from '@/model/Language';
import PaginatedResponse from '@/model/PaginatedResponse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

const config = {
  baseURL: SETTINGS_SERVICE_BASE_URL,
};

function getCountries(filters) {
  return httpService.get('countries', {
    ...config,
    params: {
      ...filters,
      perPage: filters.perPage,
      page: filters.page - 1,
    },
  });
}

function getLanguage(filters) {
  return httpService.get('languages', {
    ...config,
    params: filters
      ? {
          name: filters.name,
          perPage: filters.perPage,
          page: filters.page - 1,
          sort: filters.sort,
          status: filters.status,
        }
      : {},
  });
}

function getCurrency(filters) {
  return httpService.get('currencies', {
    ...config,
    params: {
      ...filters,
      size: filters.perPage,
      page: filters.page - 1,
    },
  });
}

export const useGetCurrencies = (filters) => {
  return useQuery({
    queryKey: ['currencies', JSON.stringify(filters)],
    queryFn: () => getCurrency(filters),
    refetchOnWindowFocus: false,
    select: (response) => new PaginatedResponse(response.data.data, Currency),
  });
};

export const useGetLanguage = (filters) => {
  return useQuery({
    queryKey: ['languages', JSON.stringify(filters)],
    queryFn: () => getLanguage(filters),
    refetchOnWindowFocus: false,
    select: (response) => new PaginatedResponse(response.data.data, Language),
  });
};

export const getCountry = (CountryId) => {
  return httpService.get(`countries/${CountryId}`, {
    ...config,
  });
};

export const useGetCountries = (filters) => {
  return useQuery({
    queryKey: ['countries', JSON.stringify(filters)],
    queryFn: () => getCountries(filters),
    refetchOnWindowFocus: false,
    select: (response) => new PaginatedResponse(response.data.data, Country),
  });
};

const addCountry = (country) => {
  return httpService.post('countries', country, {
    ...config,
  });
};

const editCountry = (country) => {
  return httpService.put(`countries/${country.id}`, country, {
    ...config,
  });
};

export const useGetCountry = (CountryId) => {
  return useQuery({
    queryKey: ['countries', CountryId],
    queryFn: () => getCountry(CountryId),
    refetchOnWindowFocus: false,
    select: (response) => new Country(response.data?.data?.content[0]),
  });
};

export const useAddCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-countries'],
    mutationFn: addCountry,
    select: (response) => new Country(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });
};

export const useEditCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-country'],
    mutationFn: editCountry,
    select: (response) => new Country(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: ['countries', payload.id] });
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });
};

const CountryService = {
  useGetCountries: useGetCountries,
  useGetLanguage,
  getCountry,
  useGetCountry,
  useAddCountry,
  useEditCountry,
};

export default CountryService;
