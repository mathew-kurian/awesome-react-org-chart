using System;

namespace OrgChart.Annotations
{
    /// <summary>
    /// TODO: remove.
    /// </summary>
    public class CanBeNullAttribute : Attribute { }

    /// <summary>
    /// Describes dependency between method input and output.
    /// </summary>
    /// <syntax>
    /// <p>Function Definition Table syntax:</p>
    /// <list>
    /// <item>FDT      ::= FDTRow [;FDTRow]*</item>
    /// <item>FDTRow   ::= Input =&gt; Output | Output &lt;= Input</item>
    /// <item>Input    ::= ParameterName: Value [, Input]*</item>
    /// <item>Output   ::= [ParameterName: Value]* {halt|stop|void|nothing|Value}</item>
    /// <item>Value    ::= true | false | null | notnull | canbenull</item>
    /// </list>
    /// If method has single input parameter, it's name could be omitted.<br/>
    /// Using <c>halt</c> (or <c>void</c>/<c>nothing</c>, which is the same)
    /// for method output means that the methos doesn't return normally.<br/>
    /// <c>canbenull</c> annotation is only applicable for output parameters.<br/>
    /// You can use multiple <c>[ContractAnnotation]</c> for each FDT row,
    /// or use single attribute with rows separated by semicolon.<br/>
    /// </syntax>
    /// <examples><list>
    /// <item><code>
    /// [ContractAnnotation("=> halt")]
    /// public void TerminationMethod()
    /// </code></item>
    /// <item><code>
    /// [ContractAnnotation("halt &lt;= condition: false")]
    /// public void Assert(bool condition, string text) // regular assertion method
    /// </code></item>
    /// <item><code>
    /// [ContractAnnotation("s:null => true")]
    /// public bool IsNullOrEmpty(string s) // string.IsNullOrEmpty()
    /// </code></item>
    /// <item><code>
    /// // A method that returns null if the parameter is null,
    /// // and not null if the parameter is not null
    /// [ContractAnnotation("null => null; notnull => notnull")]
    /// public object Transform(object data) 
    /// </code></item>
    /// <item><code>
    /// [ContractAnnotation("s:null=>false; =>true,result:notnull; =>false, result:null")]
    /// public bool TryParse(string s, out Person result)
    /// </code></item>
    /// </list></examples>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ContractAnnotationAttribute : Attribute
    {
        /// <summary>
        /// Ctr.
        /// </summary>
        public ContractAnnotationAttribute([NotNull] string contract)
            : this(contract, false)
        {
        }

        /// <summary>
        /// Ctr.
        /// </summary>
        public ContractAnnotationAttribute([NotNull] string contract, bool forceFullStates)
        {
            Contract = contract;
            ForceFullStates = forceFullStates;
        }

        /// <summary>
        /// Text of the contract.
        /// </summary>
        [NotNull]
        public string Contract { get; private set; }

        /// <summary>
        /// Require full list of states/possible values for covered member.
        /// </summary>
        public bool ForceFullStates { get; private set; }
    }

    /// <summary>
    /// Indicates that a method does not make any observable state changes.
    /// The same as <c>System.Diagnostics.Contracts.PureAttribute</c>.
    /// </summary>
    /// <example><code>
    /// [Pure] int Multiply(int x, int y) => x * y;
    /// 
    /// void M() {
    ///   Multiply(123, 42); // Waring: Return value of pure method is not used
    /// }
    /// </code></example>
    [AttributeUsage(AttributeTargets.Method)]
    public sealed class PureAttribute : Attribute
    {
    }
}