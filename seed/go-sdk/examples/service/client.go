// This file was auto-generated by Fern from our API Definition.

package service

import (
	context "context"
	fmt "fmt"
	fern "github.com/examples/fern"
	core "github.com/examples/fern/core"
	option "github.com/examples/fern/option"
	http "net/http"
)

type Client struct {
	baseURL string
	caller  *core.Caller
	header  http.Header
}

func NewClient(opts ...option.RequestOption) *Client {
	options := core.NewRequestOptions(opts...)
	return &Client{
		baseURL: options.BaseURL,
		caller: core.NewCaller(
			&core.CallerParams{
				Client:      options.HTTPClient,
				MaxAttempts: options.MaxAttempts,
			},
		),
		header: options.ToHeader(),
	}
}

func (c *Client) GetMovie(
	ctx context.Context,
	movieId fern.MovieId,
	opts ...option.RequestOption,
) (*fern.Movie, error) {
	options := core.NewRequestOptions(opts...)

	baseURL := ""
	if c.baseURL != "" {
		baseURL = c.baseURL
	}
	if options.BaseURL != "" {
		baseURL = options.BaseURL
	}
	endpointURL := fmt.Sprintf(baseURL+"/"+"movie/%v", movieId)

	headers := core.MergeHeaders(c.header.Clone(), options.ToHeader())

	var response *fern.Movie
	if err := c.caller.Call(
		ctx,
		&core.CallParams{
			URL:         endpointURL,
			Method:      http.MethodGet,
			MaxAttempts: options.MaxAttempts,
			Headers:     headers,
			Client:      options.HTTPClient,
			Response:    &response,
		},
	); err != nil {
		return nil, err
	}
	return response, nil
}

func (c *Client) CreateMovie(
	ctx context.Context,
	request *fern.Movie,
	opts ...option.RequestOption,
) (fern.MovieId, error) {
	options := core.NewRequestOptions(opts...)

	baseURL := ""
	if c.baseURL != "" {
		baseURL = c.baseURL
	}
	if options.BaseURL != "" {
		baseURL = options.BaseURL
	}
	endpointURL := baseURL + "/" + "movie"

	headers := core.MergeHeaders(c.header.Clone(), options.ToHeader())

	var response fern.MovieId
	if err := c.caller.Call(
		ctx,
		&core.CallParams{
			URL:         endpointURL,
			Method:      http.MethodPost,
			MaxAttempts: options.MaxAttempts,
			Headers:     headers,
			Client:      options.HTTPClient,
			Request:     request,
			Response:    &response,
		},
	); err != nil {
		return "", err
	}
	return response, nil
}

func (c *Client) GetMetadata(
	ctx context.Context,
	request *fern.GetMetadataRequest,
	opts ...option.RequestOption,
) (*fern.Metadata, error) {
	options := core.NewRequestOptions(opts...)

	baseURL := ""
	if c.baseURL != "" {
		baseURL = c.baseURL
	}
	if options.BaseURL != "" {
		baseURL = options.BaseURL
	}
	endpointURL := baseURL + "/" + "metadata"

	queryParams, err := core.QueryValues(request)
	if err != nil {
		return nil, err
	}
	if len(queryParams) > 0 {
		endpointURL += "?" + queryParams.Encode()
	}

	headers := core.MergeHeaders(c.header.Clone(), options.ToHeader())
	headers.Add("X-API-Version", fmt.Sprintf("%v", request.XApiVersion))

	var response *fern.Metadata
	if err := c.caller.Call(
		ctx,
		&core.CallParams{
			URL:         endpointURL,
			Method:      http.MethodGet,
			MaxAttempts: options.MaxAttempts,
			Headers:     headers,
			Client:      options.HTTPClient,
			Response:    &response,
		},
	); err != nil {
		return nil, err
	}
	return response, nil
}