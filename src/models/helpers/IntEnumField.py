from marshmallow import fields
from marshmallow import ValidationError


class IntEnumField(fields.Field):
    def __init__(self, enum, *args, **kwargs):
        self.enum = enum
        super(IntEnumField, self).__init__(*args, **kwargs)

    def _serialize(self, value, attr, obj):
        if value is None:
            return None
        return self.enum(value).name

    def _deserialize(self, value, attr, obj):
        try:
            if value is None:
                return None
            return self.enum[value.upper()]

        except KeyError:
            raise ValidationError('not_valid_enum_value')
