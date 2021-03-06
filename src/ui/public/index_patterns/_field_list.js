import { IndexedArray } from 'ui/indexed_array';
import { IndexPatternsFieldProvider } from 'ui/index_patterns/_field';
import { createLegacyClass } from '../utils/legacy_class';

export function IndexPatternsFieldListProvider(Private) {
  const Field = Private(IndexPatternsFieldProvider);

  createLegacyClass(FieldList).inherits(IndexedArray);
  function FieldList(indexPattern, specs) {
    FieldList.Super.call(this, {
      index: ['name'],
      group: ['type'],
      initialSet: specs.map(function (field) {
        return new Field(indexPattern, field);
      })
    });
  }

  return FieldList;
}
