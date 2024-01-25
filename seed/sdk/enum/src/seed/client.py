# This file was auto-generated by Fern from our API Definition.

import typing

import httpx

from .core.client_wrapper import AsyncClientWrapper, SyncClientWrapper
from .inlined_request._client import AsyncInlinedRequestClient, InlinedRequestClient
from .path_param._client import AsyncPathParamClient, PathParamClient
from .query_param._client import AsyncQueryParamClient, QueryParamClient


class SeedEnum:
    def __init__(
        self, *, base_url: str, timeout: typing.Optional[float] = 60, httpx_client: typing.Optional[httpx.Client] = None
    ):
        self._client_wrapper = SyncClientWrapper(
            base_url=base_url, httpx_client=httpx.Client(timeout=timeout) if httpx_client is None else httpx_client
        )
        self.inlined_request = InlinedRequestClient(client_wrapper=self._client_wrapper)
        self.path_param = PathParamClient(client_wrapper=self._client_wrapper)
        self.query_param = QueryParamClient(client_wrapper=self._client_wrapper)


class AsyncSeedEnum:
    def __init__(
        self,
        *,
        base_url: str,
        timeout: typing.Optional[float] = 60,
        httpx_client: typing.Optional[httpx.AsyncClient] = None
    ):
        self._client_wrapper = AsyncClientWrapper(
            base_url=base_url, httpx_client=httpx.AsyncClient(timeout=timeout) if httpx_client is None else httpx_client
        )
        self.inlined_request = AsyncInlinedRequestClient(client_wrapper=self._client_wrapper)
        self.path_param = AsyncPathParamClient(client_wrapper=self._client_wrapper)
        self.query_param = AsyncQueryParamClient(client_wrapper=self._client_wrapper)