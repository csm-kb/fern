// This file was auto-generated by Fern from our API Definition.

package fileupload

import (
	json "encoding/json"
	fmt "fmt"
	internal "github.com/file-upload/fern/internal"
)

type JustFileWithQueryParamsRequet struct {
	MaybeString           *string   `json:"-" url:"maybeString,omitempty"`
	Integer               int       `json:"-" url:"integer"`
	MaybeInteger          *int      `json:"-" url:"maybeInteger,omitempty"`
	ListOfStrings         []string  `json:"-" url:"listOfStrings"`
	OptionalListOfStrings []*string `json:"-" url:"optionalListOfStrings,omitempty"`
}

type MyRequest struct {
	MaybeString           *string     `json:"maybeString,omitempty" url:"-"`
	Integer               int         `json:"integer" url:"-"`
	MaybeInteger          *int        `json:"maybeInteger,omitempty" url:"-"`
	OptionalListOfStrings []string    `json:"optionalListOfStrings,omitempty" url:"-"`
	ListOfObjects         []*MyObject `json:"listOfObjects,omitempty" url:"-"`
	OptionalMetadata      interface{} `json:"optionalMetadata,omitempty" url:"-"`
	OptionalObjectType    *ObjectType `json:"optionalObjectType,omitempty" url:"-"`
	OptionalId            *Id         `json:"optionalId,omitempty" url:"-"`
}

type Id = string

type MyObject struct {
	Foo string `json:"foo" url:"foo"`

	extraProperties map[string]interface{}
	_rawJSON        json.RawMessage
}

func (m *MyObject) GetFoo() string {
	if m == nil {
		return ""
	}
	return m.Foo
}

func (m *MyObject) GetExtraProperties() map[string]interface{} {
	return m.extraProperties
}

func (m *MyObject) UnmarshalJSON(data []byte) error {
	type unmarshaler MyObject
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*m = MyObject(value)

	extraProperties, err := internal.ExtractExtraProperties(data, *m)
	if err != nil {
		return err
	}
	m.extraProperties = extraProperties

	m._rawJSON = json.RawMessage(data)
	return nil
}

func (m *MyObject) String() string {
	if len(m._rawJSON) > 0 {
		if value, err := internal.StringifyJSON(m._rawJSON); err == nil {
			return value
		}
	}
	if value, err := internal.StringifyJSON(m); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", m)
}

type ObjectType string

const (
	ObjectTypeFoo ObjectType = "FOO"
	ObjectTypeBar ObjectType = "BAR"
)

func NewObjectTypeFromString(s string) (ObjectType, error) {
	switch s {
	case "FOO":
		return ObjectTypeFoo, nil
	case "BAR":
		return ObjectTypeBar, nil
	}
	var t ObjectType
	return "", fmt.Errorf("%s is not a valid %T", s, t)
}

func (o ObjectType) Ptr() *ObjectType {
	return &o
}

type WithContentTypeRequest struct {
	Foo string    `json:"foo" url:"-"`
	Bar *MyObject `json:"bar,omitempty" url:"-"`
}
