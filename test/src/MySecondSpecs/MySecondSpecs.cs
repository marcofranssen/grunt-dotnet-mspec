using System;
using Machine.Specifications;

namespace MySecondSpecs
{
    [Subject("Awesomeness using node.js grunt test runner"), Tags("nodejs", "grunt")]
    public class When_I_am_executed_by_the_grunt_task
    {
        Because of = () => Exception = Catch.Exception(() => Value = true);

        It should_have_set_the_value_to_true = () => Value.ShouldBeTrue();
        It should_not_throw_an_exception = () => Exception.ShouldBeNull();

        private static bool Value;
        private static Exception Exception;
    }
}
